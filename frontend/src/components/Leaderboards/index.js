import {
  faCalendarDay,
  faCrown,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import './Leaderboards.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Leaderboards = () => {
  return (
    <div id="leaderboards-wrapper" className="popup-wrapper">
      <div id="leaderboards">
        <div className="leaderboards-top">
          <div className="main-title">All-Time English Leaderboards</div>
          <div className="sub-title">Next update in: 12:01</div>
          <div className="text-button show-yesterday-button hidden">
            <FontAwesomeIcon icon={faCalendarDay} /> Show Yesterday
          </div>
          <div className="buttons">
            <div className="button-group time-range">
              <div className="button all-time active">all-time</div>
              <div className="button daily">daily</div>
            </div>
          </div>
        </div>
        <div className="tables">
          <div className="title-and-table">
            <div className="title-and-buttons">
              <div className="title">Time 15</div>
              <div className="buttons">
                <div className="button left-table-jump-to-top">
                  <FontAwesomeIcon icon={faCrown} />
                </div>
                <div className="button left-table-jump-to-me disabled">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
            </div>
            <div className="left-table-wrapper">
              <table className="left">
                <thead>
                  <tr>
                    <td width="1%">#</td>
                    <td>name</td>
                    <td className="align-right" width="15%">
                      wpm
                      <br />
                      <div className="sub">accuracy</div>
                    </td>
                    <td className="align-right" width="15%">
                      raw
                      <br />
                      <div className="sub">consistency</div>
                    </td>
                    <td className="align-right" width="22%">
                      date
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="title-and-table">
            <div className="title-and-buttons">
              <div className="title">Time 60</div>
              <div className="buttons">
                <div className="button rightTableJumpToTop">
                  <FontAwesomeIcon icon={faCrown} />
                </div>
                <div className="button rightTableJumpToMe disabled">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
            </div>
            <div className="right-table-wrapper">
              <table className="right">
                <thead>
                  <tr>
                    <td width="1%">#</td>
                    <td>name</td>
                    <td className="align-right" width="1%">
                      wpm
                      <br />
                      <div className="sub">accuracy</div>
                    </td>
                    <td className="align-right" width="1%">
                      raw
                      <br />
                      <div className="sub">consistency</div>
                    </td>
                    <td className="align-right" width="110px">
                      date
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Leaderboards
