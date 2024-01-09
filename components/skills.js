import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Skills({ skills }) {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
	};

	return (
		<Slider {...settings}>
			{skills.map((skill, index) => (
				<div
					key={index}
					className="skill-card max-w-sm rounded overflow-hidden shadow-lg"
				>
					<img
						class="w-full"
						src={skill.coverImage.url}
						alt="Sunset in the mountains"
					/>
					<div class="px-6 py-4">
						<div class="font-bold text-xl mb-2">{skill.title}</div>
						<p class="text-gray-700 text-base">{skill.description}</p>
					</div>
					<div class="px-6 pt-4 pb-2">
						<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							#photography
						</span>
						<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							#travel
						</span>
						<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							#winter
						</span>
					</div>
				</div>
			))}
		</Slider>
	);
}