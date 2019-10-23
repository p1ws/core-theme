	<div class="blocks__container flexrow xs--around md--between">
		<?php while( have_rows('content-grid') ): the_row(); ?>
			<a href="<?php the_sub_field('grid-block_link'); ?>" class="block xs--1 md--1of2">
				<div class="block__content-wrapper">
					<div class="block__image">
						<div class="objectfit-container <?php the_sub_field('grid-block_image-fit'); ?>">
							<?php
								$image = get_sub_field('grid-block_image'); 
								$size = 'full'; // (thumbnail, medium, large, full or custom size)

								if( $image ) {
								echo wp_get_attachment_image( $image, $size );
								}
							?>
						</div>
					</div>
					<div class="block__content">
						<h3 class="block__title"><?php the_sub_field('grid-block_title'); ?></h3>
						<?php the_sub_field('grid-block_content'); ?>
					</div>
					<!-- Button -->
					<!-- <!?php if( have_rows('grid-block_cta') ): ?>
						<div class="xs--align-right">
							<!?php while( have_rows('grid-block_cta') ): the_row(); ?>
								<a class="btn--primary" href="<!?php the_sub_field('cta_link'); ?>"><!?php the_sub_field('cta_text'); ?> <i class="fas fa-arrow-right"></i></a>
							<!?php endwhile; ?>	
						</div>			
					<!?php endif; ?>	-->					
				</div>
			</a>
		<?php endwhile; ?>	
	</div>	


				