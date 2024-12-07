$(document).ready(function() {
    // Existing UIUtils functions can be converted or enhanced with jQuery
    
    // Smooth Scrolling with jQuery
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Project Card Hover Effects with jQuery
    $('.project-card').hover(
        function() {
            $('.project-card').not(this).css('opacity', '0.7');
        }, 
        function() {
            $('.project-card').css('opacity', '1');
        }
    );

    // Theme Toggle with jQuery
    $('.theme-toggle').on('click', function() {
        $('body').toggleClass('light-mode');
    });

    // Hide/Show Sections with Button (Example of content toggling)
    function createSectionToggles() {
        const sections = ['about', 'skills', 'projects'];
        
        sections.forEach(section => {
            const $section = $(`#${section}`);
            const $toggleBtn = $(`<button class="btn btn-secondary section-toggle" data-section="${section}">Toggle ${section.charAt(0).toUpperCase() + section.slice(1)}</button>`);
            
            $toggleBtn.insertBefore($section);
            
            $toggleBtn.on('click', function() {
                $section.toggle('slow');
            });
        });
    }

    createSectionToggles();

    // Dynamic Copyright Year with jQuery
    $('.year').text(new Date().getFullYear());

    // Example of Modal for Project Details
    function createProjectModals() {
        $('.project-card').each(function() {
            const $card = $(this);
            const title = $card.find('.card-title').text();
            const description = $card.find('.card-text').text();

            $card.append(`
                <div class="modal fade" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            $card.on('click', function() {
                $card.find('.modal').modal('show');
            });
        });
    }

    createProjectModals();
});

// Add dynamic styles
const styles = `
    .section-toggle {
        margin-bottom: 15px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    
    .project-card {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .project-card:hover {
        transform: scale(1.05);
    }
`;

$('<style>').prop('type', 'text/css').html(styles).appendTo('head');