

async function main() {
    const [drivers, destinations] = await readDriversAndDestinations();
    const driverAssignments = mapDriversToDestinations(drivers, destinations);
}

main();

async function readDriversAndDestinations () {
    // TODO
    const inquirer = require('inquirer');
    const answers = await inquirer.prompt(
        [
            {
                name: 'driversListPath',
                message: 'Enter the path to the drivers list file'
            },
            {
                name: 'destinationsListPath',
                message: 'Enter the path to the destinations list file'
            }
        ]
    );
    const {driversListPath, destinationsListPath} = answers;
    console.log('', driversListPath,'\n',destinationsListPath);

    const drivers: string[] = [];
    const destinations: string[] = [];
    return [drivers, destinations];
}

function mapDriversToDestinations (
    names: Iterable<String>,
    addresses: Iterable<String>
) : {[driver: string]: [destination: string]} {
    // TODO
    const scores: {[name: string]: number} = {};
    // throw new Error(`${names}:${addresses}`);
    return {};
}

function initializeRewardMatrix () {

}

function calculateSuitabilityScore(name: string, address: string) {
    // TODO
    throw new Error(`${name}:${address}`);
}