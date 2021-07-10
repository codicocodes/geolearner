<script>
  import { Motion, AnimatePresence } from 'svelte-motion' 
  import { fade } from 'svelte/transition';
  import AnimatedTips from './AnimatedTips.svelte' 
  import Settings from "./Settings.svelte"
  export let visible = true
  export let country;
  export let tips = []

  let area;
  let tipsIsOpen = false
  let settingsIsOpen = false

  function hideTips() {
    visible = false
  }

  function toggleTips() {
    tipsIsOpen = !tipsIsOpen

    if(tipsIsOpen) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  function handleSettingsToggled(event) {
    settingsIsOpen = event.detail.visible
  }

</script>

{#if visible}
  <main out:fade bind:this={area}>
    <div class="tips-container">
      <div class="tips-header">
        <h1>{tips.length} tips to help you correctly guess {country}</h1>
        <div class="flex-fill"/>
          <button on:click={toggleTips} class="toggle">toggle</button>
          <button on:click={hideTips} class="hide">Hide</button>
          <Settings on:settings_toggled={handleSettingsToggled}/>
        </div>

        <!-- Animate settings -->
        <Motion layout initial={{ borderRadius: 10 }} let:motion={m1} >
          <div use:m1>
            <AnimatePresence list={settingsIsOpen ? [{ key: 1 }] : []}>
              <Motion
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                let:motion={m3}
              >

                <div use:m3 style={"height: 200px;"}>
                  <h1>
                    GeoLearner Settings
                  </h1>
                </div>
              </Motion>
            </AnimatePresence>
          </div>
      </Motion>

        <!-- Animate tips -->
        <AnimatedTips isOpen={tipsIsOpen} tips={tips} />
    </div>
  </main>
{/if}

<style>
  
  main {
    width: 100%;
    display: flex;
    justify-content: center; 
  }

  .tips-container {
    /* height: 300px; */
    max-width: 896px;
    width: 100%;
    display: flex;
    margin: 10p;
    justify-content: center; 
    flex-direction: column;
    background: #fff;
    border-radius: .25rem;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 40px;
  }
   
  .tips-header {
    /* margin: 0 30px; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: static;
    padding: 1rem;
  }

  .flex-fill{
    flex-grow: 1;
  }

  button {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: .5rem;
    border-radius: .5rem;
    color: #fff;
    text-align: center;  
    right: 50px;
    margin: 0 .2rem;
    cursor: pointer;
  }
 
  .toggle {
    background: #568209;
  }

  .hide {
    background: #ff3e00;
  }


  h1 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
    padding: .5rem;
    opacity: 70%;
    text-align: center;
    margin: 0;
  }



</style>

