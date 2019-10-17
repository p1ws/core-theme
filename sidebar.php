				<div id="sidebar1" class="sidebar <?php $classes = get_body_class(); if (in_array('single-post',$classes) || in_array('blog',$classes) || in_array('archive',$classes)) { echo "xs--1 md--1"; } else { echo "xs--hide md--show md--1of3 lg--2of5"; } ?>">
		
					<div id="default-sidebar">

						<?php if ( is_active_sidebar( 'sidebar1' ) ) : ?>

							<?php dynamic_sidebar( 'sidebar1' ); ?>

						<?php else : ?>

							<?php
								/*
								* This content shows up if there are no widgets defined in the backend.
								*/
							?>

							<div class="no-widgets">
								<p>This is a widget ready area. Add some and they will appear here.</p>
							</div>

						<?php endif; ?>
					</div>

				</div>
