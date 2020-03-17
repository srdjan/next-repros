import Link from 'next/link'

export default () => (
  <div className='header'>
    <input id='toggle' type='checkbox' />
    <label className='toggle-container' htmlFor='toggle'>
      <span className='button button-toggle' />
    </label>
      <nav className='nav'>
        <Link href='/'>
          <a className='nav-item'> Home</a>
        </Link>
        <Link href="/about">
          <a className='nav-item'> About</a>
        </Link>
      </nav>
  
    <style jsx>{`
      .header {
        position: relative;
        z-index: 99999;
      }
      #toggle {
        position: absolute;
        left: -100%;
        top: -100%;
      }
      #toggle:focus ~ .toggle-container .button-toggle {
        box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1);
      }
      #toggle:checked ~ .toggle-container .button-toggle {
        box-shadow: 0 0 0 250px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1);
      }
      #toggle:checked ~ .toggle-container .button-toggle:hover {
        box-shadow: 0 0 0 250px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1);
      }
      #toggle:checked ~ .toggle-container .button-toggle:before {
        transform: translateY(-50%) rotate(45deg) scale(1);
      }
      #toggle:checked ~ .toggle-container .button-toggle:after {
        transform: translateY(-50%) rotate(-45deg) scale(1);
      }
      #toggle:checked:focus ~ .toggle-container .button-toggle {
        box-shadow: 0 0 0 250px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1);
      }
      #toggle:checked ~ .nav {
        margin-bottom: 50px;
        pointer-events: auto;
        transform: translate(50px, 50px);
      }
      #toggle:checked ~ .nav .nav-item {
        color: #6d85ff;
        letter-spacing: 0;
        height: 30px;
        line-height: 30px;
        margin-top: 0;
        opacity: 1;
        transform: scaleY(1);
        transition: 0.5s, opacity 0.1s;
      }
      #toggle:checked ~ .nav .nav-item:before {
        opacity: 0;
      }
      .button-toggle {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        border-radius: 100%;
        transition: 0.6s;
      }
      .button-toggle:hover {
        box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.1),
          inset 0 0 0 0px rgba(0, 0, 0, 0.1);
      }
      .button-toggle:before,
      .button-toggle:after {
        position: absolute;
        content: '';
        top: 50%;
        left: 1%;
        width: 100%;
        height: 2px;
        background-color: #6d85ff;
        border-radius: 5px;
        transition: 0.5s;
      }
      .button-toggle:before {
        transform: translateY(-50%) rotate(45deg) scale(0);
      }
      .button-toggle:after {
        transform: translateY(-50%) rotate(-45deg) scale(0);
      }

      /* Menu */
      .nav {
        display: inline-block;
        margin: 0px;
        pointer-events: none;
        transition: 0.5s;
      }

      .nav-item {
        position: relative;
        display: inline-block;
        float: left;
        clear: both;
        color: transparent;
        font-size: 14px;
        letter-spacing: -6.2px;
        height: 7px;
        line-height: 7px;
        text-transform: uppercase;
        white-space: nowrap;
        transform: scaleY(0.2);
        transition: 0.5s, opacity 1s;
      }
      .nav-item:before {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #6d85ff;
        transform: translateY(-50%) scaleY(5);
        transition: 0.5s;
      }
    `}</style>
  </div>
)
