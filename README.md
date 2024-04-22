# Smoothflow Task Management App

React Typescript exploring Context API as state manager. A study on prop drilling, data persistence, and data modeling. Client browser localStorage acts as a local API database.

Data is decoupled into two sets:

- A userProfile that stores structured layout information. This data is not expected to change frequently and therefore is allowed to prop drill.

- General sessionStore that stores key-value data pairs such as text information that would be displayed in the structured layout. This data will change often and frequently and therefore is mutated mostly via Context (a la Redux).

# User Stories

[ ] A user can enter tasks organized in blocks
[ ] A user can configure their dashboard by moving around blocks of tasks
[ ] A user can label their blocks
[ ] A new user will auto-generate a default profile
