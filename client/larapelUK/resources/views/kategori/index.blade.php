
{{-- <style>
    :root {
    --primary-color: #586e9a;
    --secondary-color: #45435c;
    --accent-color: #857372;
    --light-color: #f3f2f3;
    --dark-color: #45383f;
    --gradient-color: linear-gradient(to right, #45435c, #586e9a);
    }

    body {
        background-color: var(--light-color);
        color: var(--dark-color);
        font-family: Arial, sans-serif;
    }

    .container {
        margin-top: 20px;
    }

    h1 {
        color: var(--primary-color);
    }

    .alert-success {
        background-color: var(--accent-color);
        color: var(--light-color);
    }

    .btn-primary {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--light-color);
    }

    .btn-primary:hover {
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
    }

    .btn-danger {
        background-color: var(--dark-color);
        border-color: var(--dark-color);
        color: var(--light-color);
    }

    .card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        min-height: 350px;
        max-height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        background-color: var(--light-color);
    }

    .card-img {
        height: 200px;
        background-size: cover;
        background-position: center;
    }

    .card-body {
        background: var(--light-color);
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
    }

    .card:hover .card-body {
        opacity: 1;
    }

    .card-title {
        color: var(--primary-color);
    }

    .card-text {
        color: var(--dark-color);
    }

    a.btn-primary {
        display: block;
        text-align: center;
        background: var(--gradient-color);
        border: none;
        border-radius: 5px;
        color: var(--light-color);
        padding: 10px;
        text-decoration: none;
    }

    a.btn-primary:hover {
        background: var(--secondary-color);
    }
</style>

    <div class="container">
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
        <div class="d-flex justify-content-end my-3">
            @if(session()->has('user_id'))
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="btn btn-danger">Logout</button>
                </form>
            @endif
        </div>
        <h1 class="mt-4">Daftar Kategori Destinasi</h1>
        <div class="row">
            @foreach($kategoris as $kategori)
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="{{ asset('storage/' . $kategori->image) }}" class="card-img-top" alt="Kategori Image">
                    <div class="card-body">
                        <h5 class="card-title">{{ $kategori->nama_kategori }}</h5>
                        <p class="card-text">{{ $kategori->deskripsi }}</p>
                        <a href="/subkategori/{{ $kategori->id }}" class="btn btn-primary">Lihat Subkategori</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div> --}}
@extends('layouts.app')

@section('content')

	<style>
		.carousel-item img {
        height: 300px !important;
        object-fit: cover;
    }
    .carousel {
        width: 98.9vw;
    }
		
		.animated-button {
				position: relative;
				display: flex;
				align-items: center;
				gap: 4px;
				padding: 7px 27px;
				border: 4px solid;
				border-color: transparent;
				font-size: 16px;
				background-color: inherit;
				border-radius: 100px;
				font-weight: 600;
				color: #0D6EFD;
				box-shadow: 0 0 0 2px #0D6EFD;
				cursor: pointer;
				overflow: hidden;
				transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		}

			.animated-button svg {
				position: absolute;
				width: 24px;
				fill: #0D6EFD;
				z-index: 9;
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
		}

			.animated-button .arr-1 {
				right: 16px;
			}

			.animated-button .arr-2 {
				left: -25%;
			}

			.animated-button .circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 20px;
				height: 20px;
				background-color: #0D6EFD;
				border-radius: 50%;
				opacity: 0;
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
			}

			.animated-button .text {
				position: relative;
				z-index: 1;
				transform: translateX(-12px);
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
			}

			.animated-button:hover {
				box-shadow: 0 0 0 12px transparent;
				color: #fafafa;
				border-radius: 12px;
			}

			.animated-button:hover .arr-1 {
				right: -25%;
			}

			.animated-button:hover .arr-2 {
				left: 16px;
			}

			.animated-button:hover .text {
				transform: translateX(12px);
			}

			.animated-button:hover svg {
				fill: #fafafa;
			}

			.animated-button:active {
				scale: 0.95;
				box-shadow: 0 0 0 4px #0D6EFD;
			}

			.animated-button:hover .circle {
				width: 220px;
				height: 220px;
				opacity: 1;
			}

	</style>

	<main>
		<!--* Corousel -->
		<div
			id="carouselExampleInterval"
			class="carousel slide"
			data-bs-ride="carousel"
		>
			<div class="carousel-inner">
				<div class="carousel-item active" data-bs-interval="2000">
					<img
						src="{{ asset('images/korosel1.jpg') }}"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<img
						src="{{ asset('images/korosel2.jpg') }}"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<img
						src="{{ asset('images/korosel3.jpg') }}"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				data-bs-target="#carouselExampleInterval"
				data-bs-slide="prev"
			>
				<span
					class="carousel-control-prev-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleInterval"
				data-bs-slide="next"
			>
				<span
					class="carousel-control-next-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
		<!--* Corousel END-->
	</main>

	<section class="">
		<div class="container py-4 px-5">
			<div class="h1 text-center text-dark" id="pageHeaderTitle">Kota Destinasi Wisata</div>

			@foreach($kategoris as $kategori)
			<article class="postcard light blue">
				<a class="postcard__img_link" href="#">
					{{-- <img class="postcard__img" src="{{ asset('storage/' . $kategori->image) }}" alt="Image Title" /> --}}
					<img class="postcard__img" src="http://127.0.0.1:5000{{$kategori->image}}" alt="Image Title" />
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title blue"><a href="#">{{ $kategori->nama_kategori }}</a></h1>
					<div class="postcard__bar"></div>
					<div class="postcard__preview-txt">{{ $kategori->deskripsi }}</div>
					<ul class="postcard__tagbox">
						<a href="/subkategori/{{ $kategori->id }}">
							<button class="animated-button">
								<svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
									></path>
								</svg>
								<span class="text">Lihat Tempat wisata</span>
								<span class="circle"></span>
								<svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
									></path>
								</svg>
							</button>
						</a>
					</ul>
				</div>
			</article>
			@endforeach
		</div>
		<script src="https://kit.fontawesome.com/c0ad9aaa27.js" crossorigin="anonymous"></script>
	</section>
@endsection

				{{-- <article class="postcard light red">
					<a class="postcard__img_link" href="#">
						<img class="postcard__img" src="https://picsum.photos/501/500" alt="Image Title" />	
					</a>
					<div class="postcard__text t-dark">
						<h1 class="postcard__title red"><a href="#">Podcast Title</a></h1>
						<div class="postcard__subtitle small">
							<time datetime="2020-05-25 12:00:00">
								<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
							</time>
						</div>
						<div class="postcard__bar"></div>
						<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
						<ul class="postcard__tagbox">
							<li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
							<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
							<li class="tag__item play red">
								<a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
							</li>
						</ul>
					</div>
				</article>
				<article class="postcard light green">
					<a class="postcard__img_link" href="#">
						<img class="postcard__img" src="https://picsum.photos/500/501" alt="Image Title" />
					</a>
					<div class="postcard__text t-dark">
						<h1 class="postcard__title green"><a href="#">Podcast Title</a></h1>
						<div class="postcard__subtitle small">
							<time datetime="2020-05-25 12:00:00">
								<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
							</time>
						</div>
						<div class="postcard__bar"></div>
						<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
						<ul class="postcard__tagbox">
							<li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
							<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
							<li class="tag__item play green">
								<a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
							</li>
						</ul>
					</div>
				</article>
				<article class="postcard light yellow">
					<a class="postcard__img_link" href="#">
						<img class="postcard__img" src="https://picsum.photos/501/501" alt="Image Title" />
					</a>
					<div class="postcard__text t-dark">
						<h1 class="postcard__title yellow"><a href="#">Podcast Title</a></h1>
						<div class="postcard__subtitle small">
							<time datetime="2020-05-25 12:00:00">
								<i class="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
							</time>
						</div>
						<div class="postcard__bar"></div>
						<div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
						<ul class="postcard__tagbox">
							<li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
							<li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
							<li class="tag__item play yellow">
								<a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
							</li>
						</ul>
					</div>
				</article> --}}
			




