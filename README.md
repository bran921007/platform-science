# Coding Exercise

The following problem was assigned as a coding exercise to evaluate problem-solving skills and coding practices for candidates seeking a developer role. The solution to the problem and how it is approached serve as the basis for discussion during interview sessions. The evaluation of the solution will consider such things as:

- Code organization
- Code readability
- Quality of instructions

## Problem Statement

Our sales team has just struck a deal with Acme Inc to become the exclusive provider for routing their product shipments via 3rd party trucking fleets. The catch is that we can only route one shipment to one driver per day.

Each day we get the list of shipment destinations that are available for us to offer to drivers in our network. Fortunately our team of highly trained data scientists have developed a mathematical model for determining which drivers are best suited to deliver each shipment.

With that hard work done, now all we have to do is implement a program that assigns each shipment destination to a given driver while maximizing the total suitability of all shipments to all drivers.

The top-secret algorithm is:

- If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
- If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

Write an application in the language of your choice that assigns shipment destinations to drivers in a way that maximizes the total SS over the set of drivers. Each driver can only have one shipment and each shipment can only be offered to one driver. 

Your program should run on the command line and take as input two newline separated files, the first containing the street addresses of the shipment destinations and the second containing the names of the drivers.

The output should be the total SS and a matching between shipment destinations and drivers. You do not need to worry about malformed input, but you should certainly handle both upper and lower case names.

## Analysis

Based on the requirements outlined in the problem statement, it is identified to be within the class of combinatorial optimization problems known as the [assignment problem](https://en.wikipedia.org/wiki/Assignment_problem). The structure of the problem consists of a set of agents that can be assigned to a set of tasks. One agent can be assigned to at most one task, and one task can be assigned to at most one agent. Each possible assignment has an associated score. This score can represent either a cost or a reward. The goal is to make assignments such that all tasks are assigned an agent and the total score of those assignment is optimized. For the case where the score represents a cost, the optimization is to minimize the total score. Conversely, if the score is a reward, the optimization is to maximize the total score. In this case, the agents are the drivers and the tasks are the shipments/destinations. The suitability score represents a reward. Therefore the goal is to maximize the score. Their are four known methods for solving this problem:

- Complete enumeration method:
  - Enumerate every possible combination of assignments and then select the optimal combinations. This method doesn't scale well as the number of agents and tasks grows.
- Simplex method
- Transportation method
- Hungarian (Munkres) method

Of the four, the Hungarian method provides the most efficient algorithm with time complexity of O(n<sup>3</sup>).  

## Solution

### Assumptions

- The language used in the text is English
- Whitespaces not significant in name and address string length counts

### Approach

Having identified both the class of problem and the available methods for solving it, it was determined that the best method was the Hungarian algorithm due to it's efficiency and availability of an existing package that implements it in the chosen language. Since the role being considered for requires proficiency in node.js, the selection of node as the implementation language was natural.

### Deliverables

- The full source code, including any code written which is not part of the normal program run (e.g. build scripts)
- Clear instructions on how to build/run the app

### Installation

1. Install `node.js` (version >= 9.11.2), if not already installed:
   - See [instructions](https://nodejs.org/en/download/package-manager/) or google.
2. Install `git`, if not already installed:
   - See [instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) or google.
3. Download code:
   - Run/type '`git clone git@github.com:djilo/platform-science.git`' in terminal 
4. Enter 'platform-science' project directory created by above step:
   - Run/type '`cd platform-science`'
5. Install package dependencies:
   - Run/type '`npm install`'

### Usage

1. Create two text data files, one with the list of driver names, and the other with the list of destination addresses. Each line of the drivers file should have a single driver name. Similarly, each line of the destinations file should have a single destination address. Recall that this will be a balanced assignment, so there should be the same number of drivers as there are destinations.

2. Start the application by running/typing '`npm run start`' from within the project directory (i.e. '`platform-science`').

3. The application will prompt you to enter the filepaths to the data files created in step 1 above:

   1.  `? Enter the path to the destinations list file` :
      - Type/enter the path (e.g. '`test/data/destinations.txt`')

   2.  `? Enter the path to the drivers list file` :
      - Type/enter the path (e.g. '`test/data/drivers.txt`')

### Output

- The application will display on the console/terminal the total suitability score, along with the set of optimal driver/destination assignments that generated that score.
- Example output:

![Example output](img/ExampleOutput.png?raw=true)

