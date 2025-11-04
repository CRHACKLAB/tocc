AFRAME.registerComponent('hs-slides', {
    schema:{
        //navigation buttons
        close: {type: 'string', default: '#close'},
        next: {type: 'string', default: '#next'},
        back: {type: 'string', default: '#back'},

        //slides class name
        slides: {type: 'string', default: '.slides'},

        //hotspot plane (find a way to set the correct one)
        hsplane: {type: 'string', default: '#h01plane'}
    },
    init: function(){
        // initialize variables
        let hs = document.querySelector(this.data.hsplane);
        let close = document.querySelector(this.data.close);
        let next = document.querySelector(this.data.next);
        let back = document.querySelector(this.data.back);
        let slides = document.querySelectorAll(this.data.slides);
        // is everyone in class present?
        //console.log(hs, close, next, back, slides);

        // set the src to the first slide
        hs.setAttribute('material', 'src', slides[0])

        let i = 0; //set index to 0 (start with first image)

        next.addEventListener('click', function(){
            i < slides.length -1 ? i++ : i = 0;
            // if we're not on the last slide, set next one
            // else, set first slide
            hs.setAttribute('material', 'src', slides[i])
            //console.log('clicked next', i);
        })

        back.addEventListener('click', function(){
            i > 0 ? i-- : i = slides.length -1; 
            // if we're not on the first slide, set previous one
            // else, set last slide
            hs.setAttribute('material', 'src', slides[i])
            //console.log('clicked back', i);
        })

        close.addEventListener('click', function(){
            hs.setAttribute('scale', '0 0 0');
            //console.log('clicked close');
        })
    }
})