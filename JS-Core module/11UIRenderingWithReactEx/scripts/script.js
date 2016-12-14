let HelloMessage = require('./dist/scripts/HelloMessage.js');

class Home extends React.Component {
    render(){
        return (
            <div className="hello-wrapper">
                <div>This is the home page</div>
                <HelloMessage />
            </div>
        )
    };
}


ReactDOM.render(
    <Home />,
    $('#app')[0]
);