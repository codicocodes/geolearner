<script>
  import { Motion, AnimatePresence } from 'svelte-motion' 
  import Carousel from "svelte-carousel"
  export let isOpen = false
  export let tips = []
</script>
<Motion layout initial={{ borderRadius: 10 }} let:motion={m1} >
  <div use:m1>

    <AnimatePresence list={isOpen ? [{ key: 1 }] : []}>
      <Motion
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        let:motion={m3}
      >

        <div use:m3 >
          <Carousel>
            <div style={"display: flex;"}>
              {#each tips as { type, image }}
                <div class="tip">
                  <div class="tip-title">
                    <h2>{type}</h2>
                  </div>
                  <img src={image} alt={type} />
                </div>
              {/each}
            </div>
          </Carousel>
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</Motion>

<style>
  .tip {
    position: relative;
    z-index: 1;
  }

  .tip-title {
    border-radius: 0.1rem;
    background: #fff;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
  }

  h2 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
    padding: .5rem;
    border-radius: .1rem;
    opacity: 70%;
    text-align: center;
    margin: 0;
  }

  img {
    border-radius: .1rem;
    height: 200px;
    max-width: 200px;
    display: block;
  }

  /* h1 { */
  /*   font-size: 1rem; */
  /*   font-weight: 600; */
  /*   letter-spacing: 0.15rem; */
  /*   text-transform: uppercase; */
  /*   padding: .5rem; */
  /*   opacity: 70%; */
  /*   text-align: center; */
  /*   margin: 0; */
  /* } */



</style>
