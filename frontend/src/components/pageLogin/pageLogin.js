import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faCheck,faRightToBracket, faXmark, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { faGoogle} from "@fortawesome/free-brands-svg-icons"
import './pageLogin.css'
const PageLogin = () => {
    return (
      <div className="pageLogin">
        <div className="register side">
          <div className="title">register</div>
          <form action autoComplete="nope">
            <div className="inputAndIndicator">
              <input className="usernameInput" placeholder="username"></input>
              <div className="statusIndicator">
                <div className="indicator level1 hidden" data-option-id="available" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCheck}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="unavailable" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="taken" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="indicator level0 hidden" data-option-id="checking" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCircleNotch}/> 
                </div>
              </div>
            </div>
            <div className="inputAndIndicator">
              <input className="emailInput" placeholder="email"></input>
              <div className="statusIndicator">
                <div className="indicator level1 hidden" data-option-id="valid" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCheck}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="invalid" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
              </div>
            </div>
            <div className="inputAndIndicator">
              <input className="verifyEmailInput" placeholder="verify email"></input>
              <div className="statusIndicator">
                <div className="indicator level1 hidden" data-option-id="match" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCheck}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="mismatch" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
              </div>
            </div>
            <div className="inputAndIndicator">
              <input className="passwordInput" placeholder="password"></input>
              <div className="statusIndicator">
                <div className="indicator level1 hidden" data-option-id="good" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCheck}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="short" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="weak" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
              </div>
            </div>
            <div className="inputAndIndicator">
              <input className="verifyPasswordInput" placeholder="verify password"></input>
              <div className="statusIndicator">
                <div className="indicator level1 hidden" data-option-id="match" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faCheck}/>
                </div>
                <div className="indicator level-1 hidden" data-option-id="mismatch" data-balloon-pos="up">
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
              </div>
            </div>
            <div className="button disabled">
              <a><FontAwesomeIcon icon={faUserPlus}/> Sign Up</a>
            </div>

          </form>
        </div>
        <div className="login side">
          <div className="title">login</div>
          <div class="textButton" id="forgotPasswordButton">Forgot password?</div>
          <form action >
            <div className="inputAndIndicator">
              <input className="current-email" placeholder="email"></input>
            </div>
            <div className="inputAndIndicator">
              <input className="current-password" placeholder="password"></input>
            </div>
            <div>
              <label id="rememberMe" className="checkbox">
                <input type="checkbox" checked="checked"/>
                <div className="customTextCheckbox">
                  <div className="check">
                    <FontAwesomeIcon icon={faCheck}/> 
                     
                  </div>
                </div>
                Remember me
              </label>             
            </div>
            <div className="button signIn">
              <a>
              <FontAwesomeIcon icon={faRightToBracket}/> Sign In
              </a>
            </div>
            <div style={{fontSize: '.75rem', textAlign: 'center'}}>or</div>
            <div className="button signInWithGoogle">
              <a><FontAwesomeIcon icon={faGoogle}/> Google Sign In</a>
            </div>
          </form>
        </div>
      </div>
      
    );
  }
   
  export default PageLogin;