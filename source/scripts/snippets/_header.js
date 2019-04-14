import Headroom from 'headroom.js';

var header = document.getElementById('PageHeader');

var headroom  = new Headroom(header, {
    offset : 50,
    frozen: true,
    tolerance : {
        down : 50,
        up : 0
    },
});

headroom.init();

var mY = 0;
$('.section-item:not(:first-child)').mousemove(function(e) {

    if ( e.pageY < mY ) {
        // moving upward
        headroom.pin();
    } else {
        // moving downward
        headroom.unpin();
    }

    // set new mY after doing test above
    mY = e.pageY;

});
