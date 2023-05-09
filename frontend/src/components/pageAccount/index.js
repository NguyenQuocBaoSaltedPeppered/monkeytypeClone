import './pageAccount.css'
import { useContext, useEffect, useState } from 'react'
import { GetInfo} from '../pageLogin/Utils/Common'
import AuthenticationContext from '../../Context'
const Account = () => {
  const { setIsPageAccount } = useContext(AuthenticationContext)
  const [values, setValues] = useState({
    test_completed: 0,
    userBestPlay: [
      {
        _id: 'time',
        wpm: 0,
        raw: 0,
        acc: 0,
      },
      {
        _id: 'word',
        wpm: 0,
        raw: 0,
        acc: 0,
      },
    ],
    userLatestPlay: {
      mode: 'time',
      wpm: 0,
      raw: 0,
      accuracy: 0,
    },
  })
  const user = GetInfo('username')
  const id = GetInfo('id')
  useEffect(() => {
    setIsPageAccount(true)
    try {
      fetch(`${process.env.REACT_APP_IP_KEY}/user/${id}`)
        .then((data) => data.json())
        .then((object) => {
          setValues({
            test_completed: object.test_completed,
            userBestPlay: object.userBestPlay,
            userLatestPlay: {
              mode: object.userLatestPlay.mode,
              wpm: object.userLatestPlay.wpm,
              raw: object.userLatestPlay.raw,
              accuracy: object.userLatestPlay.accuracy,
            },
          })
        })
    } catch (error) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page-account">
      <div className="content">
        <div className="profile">
          <div className="details none">
            <div className="info">
              <div className="name">{user}</div>
              <div className="completed">
                <div className="title">tests completed</div>
                <div className="value">{values.test_completed}</div>
              </div>
            </div>
            <div className="separator sep1" />
            <div className="typing-stats vertical">
              <div className="group" style={{ color: '#646669' }}>
                latest stats
              </div>
              <div className="group">
                <div className="title">mode</div>
                <div className="value" style={{ fontSize: '1rem' }}>
                  {values.userLatestPlay.mode}
                </div>
              </div>
              <div className="group">
                <div className="title">wpm</div>
                <div className="value">{values.userLatestPlay.wpm}</div>
              </div>
              <div className="group">
                <div className="title">raw</div>
                <div className="value">{values.userLatestPlay.raw}</div>
              </div>
              <div className="group">
                <div className="title">acc</div>
                <div className="value">{values.userLatestPlay.accuracy}%</div>
              </div>
            </div>
          </div>
          <div className="pbs-words">
            <div className="mode-title">
              <small style={{ fontSize: '0.75rem' }}>best</small> word
            </div>
            <div className="group">
              <div className="title">wpm</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'word').wpm}
              </div>
            </div>
            <div className="group">
              <div className="title">raw</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'word').raw}
              </div>
            </div>
            <div className="group">
              <div className="title">acc</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'word').acc}%
              </div>
            </div>
          </div>
          <div className="pbs-time">
            <div className="mode-title">
              <small style={{ fontSize: '0.75rem' }}>best</small> time
            </div>
            <div className="group">
              <div className="title">wpm</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'time').wpm}
              </div>
            </div>
            <div className="group">
              <div className="title">raw</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'time').raw}
              </div>
            </div>
            <div className="group">
              <div className="title">acc</div>
              <div className="value">
                {values.userBestPlay.find(({ _id }) => _id === 'time').acc}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
