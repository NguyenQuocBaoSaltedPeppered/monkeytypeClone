import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'
const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="key-tips">
        <span>tab</span>
         + 
        <span>enter</span>
        - Restart Test
      </div>
      <div className="left-right">
        <div className="left">
          <a
            href="https://github.com/monkeytypegame/monkeytype"
            target="_blank"
            rel="noreferrer"
            className="text-button"
          >
            <FontAwesomeIcon icon={faCode} /> GitHub
          </a>
          <a
            href="https://discord.com/invite/monkeytype"
            target="_blank"
            rel="noreferrer"
            className="text-button"
          >
            <FontAwesomeIcon icon={faDiscord} />
            Discord
          </a>
          <a
            href="https://twitter.com/monkeytypegame"
            target="_blank"
            rel="noreferrer"
            className="text-button"
          >
            <FontAwesomeIcon icon={faTwitter} />
            Twitter
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
