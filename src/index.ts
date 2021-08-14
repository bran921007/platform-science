import inquirer from 'inquirer';
import fs from 'fs';
import readline from 'readline';
import { IAssignment } from './models';

const {drivers, destinations} = await readDriversAndDestinations();
const driverAssignments = assignDriversToDestinations(drivers, destinations);

// TODO

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
    const m = name.match(/[bcdfghjklmnpqrstvwxyz]/gi);
    return m === null ? 0 : m.length;
}

function hasLengthWithCommonFactors(name: string, address: string): boolean {
    // Normalize the names and addresses by stripping any whitespace
    const strippedName = stripWhiteSpace(name);
    const strippedAddress = stripWhiteSpace(address);

    const addressLengthFactors = getFactorsBesides1(strippedAddress.length);
    const nameLengthFactors = getFactorsBesides1(strippedName.length);
    const testfactors = getFactorsBesides1(30);

    return addressLengthFactors.some(factor => nameLengthFactors.includes(factor));
}

function stripWhiteSpace(str: string) {
    return str.replace(/\s+/g,'');
}
function getFactorsBesides1(length: number) {
    return Array
        // Create sequence of numbers, ignoring 1, up to the given number
        // e.g. 7 -> [2,3,4,5,6,7]
        .from(Array(length), (_, i) => i + 2)
        // Filter for numbers in the sequence that the given length is divisible by
        .filter(i => length % i === 0);
}