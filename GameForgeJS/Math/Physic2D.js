/**
 * @doc Class Physic2D
 * @namespace Math
 * @class Physic2D
 * @author Patrick Faustino Camello
 * @summary That class was made, to compose the EngineHtml5 framework.
 * @Date 15/05/2019
 * @example
 *  This is a static class, you can just use his functions 
 * @returns void
 */

import { Vector3D } from "./Vector3D.js";

export class Physic2D {   
    static Init() {
        this.CoefficientFriction = {
            // Alumínio sobre Aço carbono
            AluminumOnCarbonSteel: {
                Static: 0.61,
                Dynamic: 0.47
            },
            // Borracha sobre Asfalto
            RubberOnAsphalt: {
                Static: 0.4,
                Dynamic: 0
            },
            // Cobre sobre Ferro fundido
            CupperOnCastIron: {
                Static: 1.1,
                Dynamic: 0.29
            },
            // Grafite sobre Grafite
            GraphiteOnGraphite: {
                Static: 0.1,
                Dynamic: 0,
            },
            // Vidro sobre Vidro
            GlassOnGlass: {
                Static: 0.94,
                Dynamic: 0.4
            },
            // Articulações dos membros humanos sobre Articulações dos membros humanos
            HumanLimbJointsOnHumanLimbJoints: {
                Static: 0.01,
                Dynamic: 0.003
            },
            WoodOnWood: {
                Static: 0.4,
                Dynamic: 0.2
            },
            RubberOnConcrete: {
                Static: 1,
                Dynamic: 0.8
            }
        };
        // Ex: this.CoefficientFriction.GraphiteOnGraphite['Dynamic'];
    }

    /*----------------------------------------------------------------------------
        Leis de Newton (Dinâmica)
        Isaac Newton (1642-1726/27)
    ----------------------------------------------------------------------------*/

    // Força relativa
    static relativeForce(mass, accelaration) {
        return (mass*accelaration);
    }

    // Força peso
    static weightForce(mass, gravity) {
        return (mass*gravity);
    }

    // Força normal / Plano Inclinado
    static normalForce(mass, gravity, angle, coefficientFriction) {
        // Calcula a força de peso
        const weight = weightForce(mass, gravity);

        // Verifica se o ângulo é fornecido
        if (angle !== undefined) {
            // Calcula Py e Px apenas uma vez
            const Py = weight * Math.cos(angle);
            const Px = weight * Math.sin(angle);

            // Verifica se o coeficiente de fricção é fornecido
            const a = coefficientFriction !== undefined
                ? gravity * (Math.sin(angle) - coefficientFriction * Math.cos(angle))
                : gravity * Math.sin(angle);

            // Retorna um vetor com Py, Px e a
            return new Vector3D(Py, Px, a);
        }

        // Se o ângulo não for fornecido, retorna apenas a força de peso
        return weight;
    }


    // Força de atrito (Usado tanto pra dinâmico/cinético, quanto pra estático)
    static frictionForce(accelarationFriction, normalForce) {
        return (accelarationFriction*normalForce);
    }

    /*----------------------------------------------------------------------------
        Lei de Hooke
        Robert Hooke (1635-1703)
    ----------------------------------------------------------------------------*/

    // Força elástica
    // Mais usual usar N/m (Newton por metro, pra constante elástica)
    // F = k*x
    static elasticForce(elasticConstant, deformation) {
        return (elasticConstant*deformation);
    }

    // Constante elástica
    // (Esse método leva em consideração que não há força atuando sobre o corpo)
    // Fn - Fp = 0 => Fn = Fp => k*x = m*g => N/m*x = m => x = N/m / m => mass resultant
    static elasticConstant(newtonPerMetre, mass) {
        return (newtonPerMetre/mass);
    }

    // Força Centrípeta
    // Fctp = m*actp
    static centripetalForce(ray, mass, velocity, angle) {
        let centripetalAccelaration = velocity != undefined ? (Math.pow(velocity, 2) / ray) : (Math.pow(angle, 2) * ray);
        return (mass * centripetalAccelaration);
    }
}