import React from 'react';
import styles from './ImgUploader.module.css';

export class ImgUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loaded: 0, 
            imgUrl: ""
        }
        this.uploadImage = this.uploadImage.bind(this);
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
                <form onSubmit={this.uploadImage}>
                    <label htmlFor={this.props.name} className={styles.file}>
                      Upload an image
                    
                    <input type="file"

                          name={this.props.name}
                          onChange={this.uploadImage}
                          accept="image/jpeg, image/jpg, image/png"
                      />
                    </label>
                </form>
                <div className={styles.thumb}>
                  <img className={styles.img} src={this.state.imgUrl} />
                </div>
                {/*<div> {Math.round(this.state.loaded, 2)} %</div>*/}
            </div>
        )
    }
}
