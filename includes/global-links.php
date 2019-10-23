
						<ul class="global-links">	
							<!--------------------------->
							<!-- Links Repeater -->
							<?php if( have_rows('global-header_links', 'options') ): ?>
								<?php while( have_rows('global-header_links', 'options') ): the_row(); ?>
									<li>
										<a href="<?php the_sub_field('header-link_link', 'options'); ?>" ><?php the_sub_field('header-link_icon', 'options'); ?> <?php the_sub_field('header-link_text', 'options'); ?></a>
									</li>						
								<?php endwhile; ?>							
							<?php endif; ?>						
							<!-------------------------->
							<!-- Company Phone -->	
							<?php if( have_rows('company_phone', 'options') ): ?>
								<?php while( have_rows('company_phone', 'options') ): the_row(); ?>
									<li>
										<a id="header--global__phone" href="tel:<?php the_sub_field('company-phone_link', 'options'); ?>" title="Call <?php bloginfo( 'name' ); ?>" >
											<?php the_sub_field('company-phone_icon', 'options'); ?> <?php the_sub_field('company-phone', 'options'); ?>
										</a>
									</li>					
								<?php endwhile; ?>							
							<?php endif; ?>		
						</ul>	