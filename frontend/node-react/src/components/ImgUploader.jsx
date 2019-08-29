import React from 'react';

export class ImgUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            selectedFile: null, 
            loaded: 0, 
            imgUrl: ""
        }

        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    handleSelectedFile(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    async uploadImage(event) {
        event.preventDefault();
        let data = new FormData();           
        try {
            data.append('file',
                this.state.selectedFile,
                this.state.selectedFile.name
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
            <div className="">
                <form onSubmit={this.uploadImage}>
                    <label htmlFor={this.props.name} className="">{this.props.title}</label>
                    <input type="file"
                        name={this.props.name}
                        onChange={this.handleSelectedFile}
                        accept="image/jpeg, image/jpg, image/png"
                    />
                    <button className="">Upload</button>
                </form>
                <div> {Math.round(this.state.loaded, 2)} %</div>
            </div>
        )
    }
}
