import { ColorModeScript, extendTheme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import  store  from './App/store';
import { Provider } from 'react-redux';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const theme = extendTheme({

  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: '#0000',
              boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.9)',
            },
          },
        },
      },
    },
    Button :{
      variants:{
        ghost:{
          _hover:{
            backgroundColor:"trasparent"
          }
        }
      }
    }
  },
  colors:{
    
    pink:{
      500:"rgba(228, 13, 134, 1)",
      600:"rgba(228, 13, 134, 1)",
      sideNav:"#c7177a"

    }
  }
});
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript  />
      <Provider store={store}>
         <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
