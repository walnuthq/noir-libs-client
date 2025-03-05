import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from 'next/link';

export default function Faq() {
    return (
        <div className="w-full mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">F.A.Q.</h2>
            <Accordion type="single" collapsible>
                <AccordionItem key="0" value="item-0">
                    <AccordionTrigger className="text-lg font-semibold">
                        What is noir-libs.org?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        <Link href="/" className="underline"> noir-libs.org</Link> is a public web registry of Noir packages.
                        It is a place where you can find and add Noir packages to your project.
                        You can also publish your own packages and share them with the community.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem key="1" value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">
                        What is noir-libs CLI tool?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        <a href="https://github.com/walnuthq/noir-libs" className="underline">noir-libs CLI</a> is
                        a package manager command-line tool for Noir projects.
                        Using a CLI you can add, update and remove packages in your Noir project.
                        It also allows to publish your packages to noir-libs.org registry so that other users can download them.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem key="2" value="item-2">
                    <AccordionTrigger className="text-lg font-semibold">
                        How to add a package to my Noir project?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        First, find a package you want to add to your project in the noir-libs.org registry.
                        Then copy a command from "Installation" section of the package details page (e.g.
                        <code className="p-1 bg-gray-200">noir-libs add aztec@0.67.0</code>).
                        Open a terminal on your Noir project directory and run the installation command.
                        The package will be downloaded to your local machine and added to your project dependencies.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem key="3" value="item-3">
                    <AccordionTrigger className="text-lg font-semibold">
                        How to remove a package from my Noir project?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        Open a terminal on your Noir project directory and run <code className="p-1 bg-gray-200">noir-libs remove &lt;package-name&gt;</code> (e.g.
                        <code className="p-1 bg-gray-200">noir-libs remove aztec</code>).
                        The package will be removed from your project dependencies.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem key="4" value="item-4">
                    <AccordionTrigger className="text-lg font-semibold">
                        How to publish a package to noir-libs.org?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        To publish a package on noir-libs.org registry, start by signing up with your GitHub account and generating
                        an API key in your <Link href="/dashboard" className="underline">Dashboard</Link>.
                        API key for publishing requires <code className="p-1 bg-gray-200">PUBLISH</code> scope.
                        Having API key, ensure your package is a valid Noir library and contains all required sections in <code className="p-1 bg-gray-200">Nargo.toml</code> file.
                        Here is the example of a Nargo.toml file content containing package sections used for publishing:
                        <pre className="p-3 bg-gray-200 rounded-md overflow-auto mt-2 mb-2">
            <code className="whitespace-pre">
{`[package]
name = "my_cool_package"
description = "A cool package for Noir"
type = "lib"
version = "0.1.0"
repository = "https://github.com/my-github-username/my_cool_package"
keywords = ["Noir", "my_cool_package"]
`}
            </code>
        </pre>
                        Open a terminal on your Noir project and export <code className="p-1 bg-gray-200">NOIR_LIBS_API_KEY</code> environment variable
                        (e.g. <code className="p-1 bg-gray-200">export NOIR_LIBS_API_KEY=&lt;your API key&gt;</code>).
                        Run <code className="p-1 bg-gray-200">noir-libs package</code> for creating a distributable tarball.
                        Then run <code className="p-1 bg-gray-200">noir-libs publish</code>.
                        The package will be published and become available for other users to download.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem key="5" value="item-5">
                    <AccordionTrigger className="text-lg font-semibold">
                        How to yank a package from noir-libs.org?
                    </AccordionTrigger>
                    <AccordionContent className="text-lg">
                        To yank a package you must be the owner of the package.
                        Sign up to noir-libs.org with your GitHub account and generate API key in your <Link href="/dashboard" className="underline">Dashboard</Link>.
                        API key for publishing requires <code className="p-1 bg-gray-200">YANK</code> scope.
                        Open a terminal on your Noir project and export <code className="p-1 bg-gray-200">NOIR_LIBS_API_KEY</code> environment variable
                        (e.g. <code className="p-1 bg-gray-200">export NOIR_LIBS_API_KEY=&lt;your API key&gt;</code>).
                        Run <code className="p-1 bg-gray-200">noir-libs yank &lt;package-name&gt;@&lt;package-version&gt;</code>.
                        The package will be yanked and become unavailable for other users to download.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}