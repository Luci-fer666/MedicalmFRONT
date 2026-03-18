import "./error.css"

function Error({ errormessage }) {

    return(
        <div className="error">
            <div>
                <img src="/assets/img/doctorstock2.png" alt="doctor"/>
                <p>Lamentablemente ha ocurrido un error, por favor vuelve a intentarlo mas tarde</p>
                <p>Lamentamos los inconvenientes</p>
            </div>
            <div>Error: {errormessage} </div>
        </div>
    )
}

export default Error;