import React from 'react'
import bot from './Shop/bot.gif'
import art from './Shop/art.png'
import './Overview.css'
import axios from '../axios'
import Dropzone from 'react-dropzone';
import Typewriter from "typewriter-effect";
var str = ["Hiii  I'm Santa", "How can i help you", "upload your image",'You want suggestions while searching'];
var text = ["click me", "you want to recognize plant", "upload image","yes"]
function Overview() {
    const [previewSrc, setPreviewSrc] = React.useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [mark, setmark] = React.useState(false)
    const dropRef = React.useRef();
    const [ij, setij] = React.useState(0)
    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);
    
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
          imagechange(uploadedFile);
          
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
      };
    
      const updateBorder = (dragState) => {
        if (dragState === 'over') {
          dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
          dropRef.current.style.border = '2px dashed #e9ebeb';
        }
      };
      const imagechange = async (uploadedFile) => {
        try {
          if (uploadedFile) {
            const formData = new FormData();
            formData.append('file', uploadedFile);
            const { data } = await axios.post('/plants/image/suggest/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            
    
          } 
        } catch (error) {
          console.log(error)
        }
      };
    
    function handler() {
        setmark(true)
    }
    function writer(typewriter) {
        typewriter
            .typeString(str[ij])
            .callFunction(() => {
                handler();
            })
            .start();

    }
    return (
        <div className="image_search">
            <img src={bot} className="logotext"></img>
            <div className="imagexy">
                <div className="bgtext">
                    <div className="text_image">
                        <h3>{str[ij]}</h3>
                    </div>
                </div>
                {ij == 2?(<Dropzone className="plantphoto" onChange={e => console.log("he")} onDrop={onDrop} onDragEnter={() => updateBorder('over')} onDragLeave={() => updateBorder('leave')}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                            <input {...getInputProps()} />
                            <p>Drag and drop a file OR click here to select a file</p>
                            {file && (
                                <div><strong>Selected file:</strong> {file.name}</div>)}
                        </div>
                    )}
                </Dropzone>):<div></div>}
                <button className="imageaction" onClick={e => setij(ij + 1)}> {text[ij]}</button>
            </div>

        </div>

    )
}

export default Overview
