import inquirer from 'inquirer';
import fs from 'fs';
import readline from 'readline';
import { IAssignment } from './models';

const {drivers, destinations} = await readDriversAndDestinations();
const driverAssignments = assignDriversToDestinations(drivers, destinations);

// TODO
console.log(driverAssignments);

async function readDriversAndDestinations (
) : Promise<{drivers: string[], destinations: string[]}> {

    const input = await inquirer.prompt(
        [
            {
                name: 'destinationsListPath',
                message: 'Enter the path to the destinations list file'
            },
            {
                name: 'driversListPath',
                message: 'Enter the path to the drivers list file'
            }
        ]
    );

    const {destinationsListPath, driversListPath} = input;

    const destinationsList = readline.createInterface({
        input: fs.createReadStream(destinationsListPath),
        crlfDelay: Infinity
    });

    const destinations: string[] = [];
    for await (const destination of destinationsList) {
        destinations.push(destination);
    }

    const driversList = readline.createInterface({
        input: fs.createReadStream(driversListPath),
        crlfDelay: Infinity
    });

    const drivers: string[] = [];
    for await (const driver of driversList) {
        drivers.push(driver);
    }

    return {drivers, destinations};
}

function assignDriversToDestinations (
    names: Iterable<string>,
    addresses: Iterable<string>
) : Map<string, string> {
    const initialMatrix = initializeRewardMatrix(names, addresses);
    // TODO
    const assignments: Map<string, string> = new Map<string, string>();
    return assignments;
}

function initializeRewardMatrix (
    names: Iterable<string>,
    addresses: Iterable<string>
) : Map<IAssignment, number> {

    const matrix = new Map<IAssignment, number>();
    for (const name of names) {
        for (const address of addresses) {
            matrix.set(
                {driver: name, destination: address},
                calculateSuitabilityScore(name, address)
            );
        }
    }
    return matrix;
}

function calculateSuitabilityScore(name: string, address: string): number {
    // Calculate the base suitability score based on the address length
    // and the number of vowels in the name
    let score = address.length % 2 == 0 ? 
        getNumberOfVowels(name) * 1.5 // Even address length
        :
        getNumberOfConsonants(name) // Odd address length

    // Augment score if address length shares common factors with name length
    return hasLengthWithCommonFactors(name, address) ?
        score * 1.5 // Increase by 50% above base SS
        :
        score;
}

function getNumberOfVowels(name: string): number {
    const m = name.match(/[aeiou]/gi);
    return m === null ? 0 : m.length;
}

function getNumberOfConsonants(name: string): number {
    const m = name.match(/^[aeiou]/gi);
    return m === null ? 0 : m.length;
}

function hasLengthWithCommonFactors(name: string, address: string): boolean {
    const nameLengthFactors = getFactorsBesides1(name.length);
    const addressLengthFactors = getFactorsBesides1(address.length);
    // TODO
    return false;
}

function getFactorsBesides1(length: number): number[] {
    // TODO
    return [];
}