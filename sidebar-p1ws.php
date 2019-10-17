				<div id="p1ws" class="sidebar xs--hide md--show md--1of3 lg--2of5">

					<?php if ( is_active_sidebar( 'p1ws' ) ) : ?>

						<?php dynamic_sidebar( 'p1ws' ); ?>

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
