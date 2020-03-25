# SCSS
- Install sass-loader which allows us import sass files, node-sass which takes our scss files and converts it to css. Sass-loader is going to use the node-sass behind the scene to convert the file
- Browsers use REM as default. 1rem=16px. this is how we convert rem to pixels systems in our app. in _base.css
                 
                 html {
                    font-size: 62.5%;
                  }
 16px * 62.5% = 10px Now we will be working on 10 PIXELS base.
 we place the settings that we use all over the app in to the **_base.scss** partial.
 

### BEM block, element and modifier
 - We can use nesting elements inside the class but it will make a mess like callback hell. We avoid it.
 - **Header** is a block, element is thing that goes inside the block, for example **button**. **disabled** props on button is a modifier.
 - .button__h1  ==> this is convention for element
   .button--link ==> this is convention for modifier
 
 **NOTE:** background proerty in css is shorthand for:
          background-color
          background-image
          background-position
          background-repeat
          background-attachment
          background-clip
          background-origin
          background-size 
 ### CSS Reset
 It makes sure that all browsers are starting from the same place. Each browser has their own set of default styles and if they are not all starting from the same place they are going to look a little different when we actually apply our styles. So not using reset is equivalent to giving two of your directions to your house. The only problem is the directions are the same but they are starting from different locations. in /src/main.js 
               
               require("normalize.css/normalize.css");//use it before require("./styles/styles.scss");

since we have need to use a css file and scss both in our project we adjust webpack dev and prod
                 //dev-client
                 
                 {
                    test: /\.s?css$/,
                    use: [
                      { loader: ExtractCssChunks.loader },
                      { loader: "css-loader" },
                      { loader: "sass-loader" }
                    ]
                  },              
                  //dev-server
                   {
                    test: /\.scss$/,
                    use: [{ loader: "css-loader" }, { loader: "sass-loader" }]
                  },
- Create **/base/_settings.scss** to place our variables. If we need to tweak any variable, we tweak it once and the change will be applied everywhere that they are used. Be aware that when you import this file into main scss file, this should be imported on top, so other files can use those variables.

- scss has built-in function. [here is color functions](https://sass-lang.com/documentation/modules/color) I used Vlighten($purple, 30%) and darken($purple, 10%) functions.

### Styling React Modal

- React Modal comes with its own DOM structure and its own set of classes. We have to explore how those classes work and then we have to override their styles. So we have to check on elements panel.
if you open React Modal in the project, you will see a new div will be injected into the DOM.

    <body class="ReactModal__Body--open">
      <div data-react-modal-body-trap="" tabindex="0" style="position: absolute; opacity: 0;"></div>
       
   inside the body, under script tag we have this
      
    
        <div class="ReactModalPortal">
        <div class="ReactModal__Overlay ReactModal__Overlay--after-open" style="position: fixed; top: 0px; left: 0px; right:        0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);">
        <div class="ReactModal__Content ReactModal__Content--after-open" tabindex="-1" role="dialog" aria-label="Selected Option" style="position: absolute; top: 40px; left: 40px; right: 40px; bottom: 40px; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px;">
                <h3>  Selected Option  </h3>
                <p>  gigh  </p>
                <button>  OK  </button> //this is where our code 
        </div>
        </div>
        </div>
        <div data-react-modal-body-trap="" tabindex="0" style="position: absolute; opacity: 0;">
        </div>
        </body>

  React Modal puts the code inside the div whose className="ReactModalPortal"
  
 ##### Adding transition to open the modal
         // when this div placed into the dom, make all the children div s invisible
         .ReactModalPortal > div {
          opacity: 0;
        }
        //when ReactModal__Overlay class is placed add a transition effect to the target eleement with eace-in-out function
        .ReactModalPortal .ReactModal__Overlay {
          transition: opacity 500ms ease-in-out;
        }
        //after transition is over and .ReactModal__Overlay--after-open is placed make opacity 1
        .ReactModalPortal .ReactModal__Overlay--after-open {
          opacity: 1;
        }

 To add closing transition React-Modal has a prop
                    
                    closeTimeoutMS={300}
                    
  - All of the elements that we added into the Modal is under the *ReactModal__Content* div. But React-modal has a className property to overwrite this classname.
                     
                    className="modal"

   To position this div, we need to add "flex" property to the parent div which is *ReactModal__Overlay*
   
           .ReactModalPortal .ReactModal__Overlay {
          transition: opacity 500ms ease-in-out;
          justify-content: center;
          align-items: center;
          display: flex;
            }
            
          .modal {
            background: $dark-blue;
            color: white;
            max-width: 30rem;
            outline: none;
            padding: $l-size;
            text-align: center;
                }
 
 Now we have to target this:
                
               <h3>  Selected Option  </h3>
               <p>  gigh  </p>
               <button>  OK  </button>
               
  we need to add classNames inside the OptionModal component
  
      <h3 className="modal__title">Selected Option</h3>
      {props.selectedOption && (
        <p className="modal__body">{props.selectedOption}</p>
      )}
      <button className="button" onClick={props.closeModal}>
        OK
      </button>
      
 - If someone enters a very long word, it will break the UI. If you try it, you will see the word will not be broken. word will be pushing out the box. Because by default words do not break. so we break it by tweaking "word-break" property.
 
             .modal__title {
              margin: 0 0 $l-size 0;
            }

            .modal__body {
              margin: 0 0 $l-size 0;
              font-size: 2rem;
              font-weight: 300;
              word-break: break-all;
            }

  



                  
                  
                  

