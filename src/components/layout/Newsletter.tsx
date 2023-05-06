const Newsletter = () => {
  return (
    <section className='newsletter'>
      <form
        action='https://pornydays.us10.list-manage.com/subscribe/post?u=9c7ed05ab79d08599fd3d90ee&amp;id=7073021cc1'
        method='post'
        id='mc-embedded-subscribe-form'
        name='mc-embedded-subscribe-form'
        className='validate'
        target='_blank'
        noValidate
      >
        <h3 className='newsletter__subtitle'>Newsletter</h3>
        <label className='newsletter__title' htmlFor='mce-EMAIL'>
          War&apos;s das schon
          <br />
          zwischen uns?
        </label>
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
      </form>
    </section>
  );
};

export default Newsletter;
