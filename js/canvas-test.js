window.onload = main;

//start here

function main() {
    const canvas = document.querySelector("#glcanvas");
    
    //Our gl context [WebGLRenderingContext]
    const gl = canvas.getContext("webgl");

    //Assert WebGL is working
    if(gl === null)
    {
        alert(
            "WebGL did not intialize correctly. Check if your machine or browser supports it!"
        );
        return;
    }

    //Set canvas color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

}