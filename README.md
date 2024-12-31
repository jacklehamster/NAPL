# NAPL

This is a protocol that turns JSON / YAML into code, allowing it it to modify its own data. This allows applications that pass data to each other and execute code, without recompilation or rebuilding of the code.

NAPL is only meant to perform actions on its own data. Then an application can read from that data and perform other operations.

## Basic Types

- Array: []
- Object: {}
- String: ""
- Number: 0,1,2,3...
- boolean: true/false

## Class Type

- Object: {
  type: "type"            // Type of the object
  owner: "ownerId"        // Owner of the object who can modify this data directly
  updates: [Update]       // Other clients issue modification commands through this
}

## Update

Update {
  timestamp: number         // The time of the update
  path: [string|number]     // The path of the item to modify
  value: value|expresssion  // Set to value or expression
}

- To perform an update, a program pushes a item into the Update array.
- The owner of the object performs updates in order of timestamp.
