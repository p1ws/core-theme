	<?php
		$image = get_field('product-content__image'); 
	?>
	<div class="blocks__container ">
		<div class="block__content-wrapper flexrow xs--around md--between">
                <div class="block__image xs--1 md--1of2">
                    <div data-featherlight="<?php echo $image; ?>" class="objectfit-container">
                        
						<img src="<?php echo $image; ?>" alt="" />
                    </div>
                </div>
				<div class="block__content xs--1 md--1of2">
				<?php while( have_rows('product-content_tabs') ): the_row(); 
				
					//Setting Up Tab Variables
					$tab_title = get_sub_field('tab_title');
					$tab_content = get_sub_field('tab_content');

				?>

					<!--- PRODUCT TABS --->
					<div id="product--tabs" class="xs--1 md--1">

						<div id="itinerary<?php echo get_row_index() ?>" class="toggle__container">

							<div class="toggle__title flexrow xs--between xs--middle">
								<h4 class="xs--3of4"><?php echo $tab_title; ?></h4>
								<i class="fas fa-chevron-down xs--1of4 xs--align-right"></i>
							</div>

							<div class="toggle__content">

								<!-- TAB CONTENT -->
								<p><?php echo $tab_content; ?></p>
								<!-- end TAB CONTENT -->

							</div>

						</div>

					</div>			
            				
				<?php endwhile; ?>	
			</div>		
		</div>
	</div>	  