# SCSS
- Install sass-loader which allows us import sass files, node-sass which takes our scss files and converts it to css. Sass-loader is going to use the node-sass behind the scene to convert the file
- Browsers use REM as default. 1rem=16px. this is how we convert rem to pixels systems in our app. in _base.css
                 
                 html {
                    font-size: 62.5%;
                  }
 16px * 62.5% = 10px Now we will be working on 10 PIXELS base.

### BEM block, element and modifier
 - We can use nesting elements inside the class but it will make a mess like callback hell. We avoid it.
 - **Header** is a block, element is thing that goes inside the block, for example **button**. **disabled** props on button is a modifier.
 

                  
                  
                  

