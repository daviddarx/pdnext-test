const Newsletter = () => {
  return (
    <section className='newsletter'>
      <form
        action='https://filmkunstfestival.us8.list-manage.com/subscribe?u=da1c3611e239cb857c6673aa3&id=3e4ca7fbe7'
        method='post'
        id='mc-embedded-subscribe-form'
        name='mc-embedded-subscribe-form'
        className='validate'
        target='_blank'
        noValidate
      >
        <h2 className='newsletter__subtitle'>Newsletter</h2>

        <label className='newsletter__title' htmlFor='mce-EMAIL'>
          War&apos;s das schon
          <br />
          zwischen uns?
        </label>

        <div className='newsletter__controls'>
          <input
            type='email'
            name='EMAIL'
            className='newsletter__field'
            id='mce-EMAIL'
            placeholder='Email Addresse'
            defaultValue=''
            required
          />

          {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
            <input
              type='text'
              name='b_9c7ed05ab79d08599fd3d90ee_7073021cc1'
              tabIndex={-1}
              defaultValue=''
            />
          </div>

          <input
            type='submit'
            value='Ich will mehr'
            name='subscribe'
            id='mc-embedded-subscribe'
            className='newsletter__button'
          />
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
