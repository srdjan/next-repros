import Image from 'next/image'

const Logo = () => (
  <span>
    <div className='logo'>
      <a href='/'>
        <Image
          src='/public/img/logo.png'
          width='100'
          height='20'
          alt='NextJsPWAKicker'
          placeholder='blur'
        />
      </a>
    </div>
    <style jsx>{`
          .logo {
            display: inline;
            padding-left: 35%;
            // margin-top: -30px;
          }    
        `}</style>
  </span>
)
export default Logo
