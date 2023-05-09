import {
  faKeyboard,
  faCrown,
  faInfo,
  faSignOutAlt,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useContext, useEffect } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import logo from '../../logo-image.svg'
import { useNavigate } from 'react-router-dom'
import { RemovedUserSession } from '../pageLogin/Utils/Common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthenticationContext from '../../Context'
import { isTimeMode, isWordsMode } from '../../config/constants'
import { GetToken, GetInfo } from '../pageLogin/Utils/Common'

const Navbar = () => {
  const user = GetInfo('username')
  const authAndMode = useContext(AuthenticationContext)
  useEffect(() => {
    authAndMode.setIsLoggedIn(GetToken() ? true : false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    authAndMode.setIsPageAccount(false)
    authAndMode.setIsLoggedIn(false)
    RemovedUserSession()
    navigate('/login')
  }
  return (
    <div id="navbar">
      <NavLink className="logo" to="/">
        <div className="icon">
          <img src={logo} className="logo logo-icon" alt="logo" />
        </div>
        <div className="text">
          <div className="top">monkey see</div>
          monkeytype
        </div>
      </NavLink>
      <div id="menu">
        <NavLink
          id="start-test-button"
          className="text-button view-start"
          to="/"
        >
          <div className="icon">
            <FontAwesomeIcon icon={faKeyboard} />
          </div>
        </NavLink>
        <div className="text-button leaderboards view-leaderboards">
          <div className="icon">
            <FontAwesomeIcon icon={faCrown} />
          </div>
        </div>
        <div className="text-button view-about">
          <div className="icon">
            <FontAwesomeIcon icon={faInfo} />
          </div>
        </div>
        {authAndMode.isLoggedIn ? (
          <NavLink className="text-button account view-account" to="account">
            <div className="icon">
              <FontAwesomeIcon icon={faUserSolid} />
            </div>
            <div className="text">{user}</div>
          </NavLink>
        ) : (
          <NavLink className="text-button login view-login" to="login">
            <div className="icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </NavLink>
        )}
      </div>
      <div
        className={'config ' + (authAndMode.isPageAccount ? 'hidden' : '')}
        style={{ transition: 'all 0.125s ease 0s', opacity: 1 }}
      >
        <div className="desktop-config">
          <div className="group mode">
            <div className="buttons">
              <div
                className={
                  'text-button ' + (authAndMode.gameMode ? '' : 'active')
                }
                mode="time"
                tabIndex={2}
                onClick={(e) => authAndMode.setGameMode(isTimeMode)}
              >
                time
              </div>
              <div
                className={
                  'text-button ' + (authAndMode.gameMode ? 'active' : '')
                }
                mode="words"
                tabIndex={2}
                onClick={(e) => authAndMode.setGameMode(isWordsMode)}
              >
                words
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={'signOut ' + (authAndMode.isPageAccount ? '' : 'hidden')}
        style={{
          gridArea: '1 / 3 / 2 / 4',
          opacity: 1,
          transition: 'all 0.25s ease 0s',
        }}
        tabIndex={0}
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> sign out
      </div>
    </div>
  )
}
export default Navbar
