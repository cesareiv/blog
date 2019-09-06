import React from 'react';
import styles from './ImgUploader.module.css';

export class ImgUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loaded: 0, 
            imgUrl: this.props.value
        };
        this.uploadImage = this.uploadImage.bind(this);
        this.fileInput = React.createRef();
    }

    async uploadImage(event) {
        event.preventDefault();
        let data = new FormData();           
        try {
            data.append('file',
                event.target.files[0],
                event.target.name
            );
            const response = await fetch('http://localhost/api/v1/images', {
                method: 'POST',
                body: data
            });
            const body = await response.json();
            this.setState({
                imgUrl : body.img_url
            });
            this.props.changeImgUrl(body.img_url);

            if ( response.status !==201 ) {
                throw Error(body.message);
            }  
        }
        catch (error) {
            console.log("no file selected")
        }
  };

    render() {
        return (
            <div className={styles.main}>
                {/* <form onSubmit={this.uploadImage}>
                     */}
                    <input type="file"
                        id={this.props.name}
                        className={styles.file}
                        ref={this.fileInput}
                        name={this.props.name}
                        onChange={this.uploadImage}
                        accept="image/jpeg, image/jpg, image/png"
                      />
                    <label className={styles.container} htmlFor={this.props.name} >
                    Add / Update image...
                    </label>
                    
                
                    {/* <input type="file"
                        className={styles.file}
                        ref={this.fileInput}
                        name={this.props.name}
                        onChange={this.uploadImage}
                        accept="image/jpeg, image/jpg, image/png"
                      />
                      <div className={styles.fakefile}>
                          Add an image
                      </div> */}


                {/* </form> */}
                <div className={styles.thumb}>
                  <img className={styles.img} src={this.state.imgUrl} />
                    </div>
                {/*<div> {Math.round(this.state.loaded, 2)} %</div>*/}
            </div>
        )
    }
}
