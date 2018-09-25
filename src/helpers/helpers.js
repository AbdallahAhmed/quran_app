export const isElementInView = function (element, fullyInView, $) {
    const pageTop = $('body').scrollTop() + $('.navbar').height();
    const pageBottom = pageTop + $(window).height() - $('.toolbar.toolbar-bottom').height();
    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).height();
    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
};
export const isGoingEnd = function (element, $, beforeSpace) {
    if(element)return false;
    const pageTop = $('body').scrollTop() + $('.navbar').height();
    const pageBottom = pageTop + $(window).height() - $('.toolbar.toolbar-bottom').height();
    const elementTop = $(element).offset().top - beforeSpace;
    console.log(pageTop,pageBottom,elementTop,':',beforeSpace );
    return (!(pageBottom < elementTop));
};
