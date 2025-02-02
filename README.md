# setting up the backend folder structure and dependencies

- installinsg eslint prettier and the relevant plugins 
``` bash 
    $ npm install --save-dev prettier@3.1.0 eslint@8.54.0 eslint-plugin-react@7.33.2 eslint-config-prettier@9.0.0 eslint-plugin-jsx-a11y@6.8.0
```
and installing the latest version of eslint 

<!-- no need for huskey -->

uninstalling the react dependencies, by running the following command
```bash
    npm uninstall --save react react-dom
```

```bash
   $ npm uninstall --save-dev vite @types/react @types/react-dom @vitejs/plugin-react  eslint-plugin-jsx-a11y eslint-plugin-react
```

edit the package.json file

install the default version of mngoose 

``` bash 
npm install mongoose
```

create the folder structure 
- database :
    - db/init
    - db/models, (each model with a file, and export the model ) 