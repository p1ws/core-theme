
	<div class="blocks__container ">
		<?php while( have_rows('media-content') ): the_row(); ?>
            <div class="block__content-wrapper flexrow xs--around md--between">
                <div class="block__image xs--1 md--1of2">
                    <div class="objectfit-container">
                        <?php
                            $image = get_sub_field('grid-block_image'); 
                            $size = 'full'; // (thumbnail, medium, large, full or custom size)

                            if( $image ) {
                            echo wp_get_attachment_image( $image, $size );
                            }
                        ?>
                    </div>
                </div>
                <div class="block__content xs--1 md--1of2">
                    <h3 class="block__title"><?php the_sub_field('grid-block_title'); ?></h3>					
                    <?php the_sub_field('grid-block_content'); ?>
                </div>						
            </div>
		<?php endwhile; ?>	
	</div>	  