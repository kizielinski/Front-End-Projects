window.onload = main;
import { initBuffers } from "./buffers.js";
import { drawScene } from "./draw-scene.js";

//start here

function main() {
    
    const canvas = document.querySelector("#glcanvas");
    
    //Our gl context [WebGLRenderingContext]
    const gl = canvas.getContext("webgl");

    //Assert WebGL is working
    if(gl === null) {
        alert(
            "WebGL did not intialize correctly. Check if your machine or browser supports it!"
        );
        return;
    }

    //Set canvas color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Default vertex shader
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }`;

    //Default fragment shader
    const fsSource = `
        void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }`;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
      };
    
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(gl);

    // Draw the scene
    drawScene(gl, programInfo, buffers);
}

//Create shader program    ctx vShader   pShader
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
}

// creates a shader of the given type, uploads the source and
// compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
      );
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
}