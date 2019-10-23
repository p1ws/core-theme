<?php while( have_rows('container') ): the_row(); ?>
	<div id="<?php the_sub_field('container_id'); ?>" class="<?php the_sub_field('container_classes'); ?>">										
        
        <?php if( have_rows('items') ): ?>
            <?php while( have_rows('items') ): the_row(); ?>
                <div id="<?php the_sub_field('item_id'); ?>" class="<?php the_sub_field('item_classes'); ?>">
                    <?php the_sub_field('item_content'); ?>
                </div>
            <?php endwhile; ?>
        <?php endif; ?>	     
    
	</div>
<?php endwhile; ?> <!--- end include/flexible-layout --->	
