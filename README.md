# Smoothflow Task Management App

React Typescript exploring Context Hook as state management. Client browser localStorage acts as a local API database.

Data is stored in localStorage into two sets:

- userProfile that stores structured layout information.
- sessionStore that stores key-value data pairs.

At the parent App level, userProfile and sessionStore data is converted and associated into usable UI types. All data changes come from Context only. Local state is avoided if at all possible, and render trees come from parent. For example if a new element is needed, the state is updated at Context which React then automatically triggers necessary renders where the state is referenced by a component.

# User Stories

[ ] A user can enter tasks organized in blocks
[ ] A user can configure their dashboard by moving around blocks of tasks
[ ] A user can label their blocks
[ ] A new user will auto-generate a default profile
