import bricks from "@/public/images/brickwall.jpeg";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-row items-center justify-center font-grafitti">
			<main className="max-w-4xl w-full text-center space-y-8">
	        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
	          About Us
	        </h1>
	        <p className="text-xl text-muted-foreground">
	          Welcome to our company. We're dedicated to making a difference.
	        </p>
	        <section className="space-y-6">
	          <h2 className="text-2xl font-semibold">Our Mission</h2>
	          <p className="text-lg">
	            At our core, we believe in innovation, sustainability, and creating value for our customers. 
	            Our mission is to deliver exceptional products and services that improve lives and businesses around the world.
	          </p>
	        </section>
	        <section className="space-y-6">
	          <h2 className="text-2xl font-semibold">Our Team</h2>
	          <p className="text-lg">
	            We're a diverse group of passionate individuals, each bringing unique skills and perspectives to the table. 
	            Together, we work tirelessly to turn our vision into reality.
	          </p>
	        </section>
	        <section className="space-y-6">
	          <h2 className="text-2xl font-semibold">Our Values</h2>
	          <ul className="text-lg list-disc list-inside">
	            <li>Integrity in all we do</li>
	            <li>Commitment to excellence</li>
	            <li>Continuous innovation</li>
	            <li>Respect for individuals and communities</li>
	          </ul>
	        </section>
	      </main>
		</div>
	);

}