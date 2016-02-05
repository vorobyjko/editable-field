Task:

Write angular directive for edit-in-place.
- It should render as span with value provided to directive
- On double-click it should render as input/select (type should be provided to directive as well)
- On Enter value should be saved
- On ESC value should be reverted

To run application as user:

- clone repo https://github.com/vorobyjko/editable-field.git
- go to dist and run index.html

To run application as developer:

- clone repo https://github.com/vorobyjko/editable-field.git
- open git bash in the root of the project
- run npm install (you should have node.js installed)
- run gulp (gulp server will be listening 0.0.0.0:8080)
- open the browser and go to 'localhost' 

Known issue:

- extra emty select item appears
