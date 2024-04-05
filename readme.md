# Instructions Overview

The `yaycazz` program includes a set of instructions organized into two main categories: `amm` (Automated Market Maker) and `event`. Each category is designed to handle specific functionalities within the application. Below is a detailed overview of each instruction module:

## AMM Instructions

- **Initialize**: Sets up the initial state or parameters for the AMM functionalities.
- **Deposit**: Allows users to deposit assets into the AMM pool.
- **Swap**: Facilitates the exchange of one type of asset for another within the AMM pool.
- **Withdraw**: Enables users to withdraw their assets from the AMM pool.

## Event Instructions

- **Create Event**: Initiates a new event within the system.
- **Create Wizzard**: Establishes a new wizzard entity. The exact nature of a "wizzard" may be specific to the application's domain.
- **Define Tokenomics**: Specifies the tokenomics structure for an event or entity within the system.
- **Distribute Tokenomics Direct**: Handles the direct distribution of tokens according to the defined tokenomics.
- **Distribute Tokenomics Provider**: Manages the distribution of tokens through a provider, potentially offering a more flexible or complex distribution mechanism.
- **Mint**: Supports the creation of new tokens within the system.
- **Select Approvement**: Facilitates the approval process for actions or entities within the system.
- **Set Event Property**: Allows for the modification or definition of properties related to events.


# State Management Overview

The `yaycazz` program includes a `state` directory designed to define and manage the state of various entities within the application. This directory contains several Rust files, each responsible for a specific aspect of the application's state. Below is a detailed overview of each state module:

## State Modules

- **Config**: Defines the configuration parameters and settings for the application or specific functionalities within it.
- **Event**: Manages the state related to events, including creation, modification, and other event-related actions.
- **Register**: Handles the registration and management of entities or users within the system, potentially including authorization or access control mechanisms.
- **Wizzard**: Manages the state and functionalities associated with "wizzard" entities. The specific role and capabilities of a wizzard may be unique to the application's domain.

Each instruction module contains the logic and operations necessary to execute specific actions within the `yaycazz` application. The modular structure ensures a clear separation of concerns and facilitates the development, testing, and maintenance of the codebase.




git submodule add git@github.com:berkayoztunc/fragment-ui.git app/yaycazz-frontend