import { Label } from 'ui/components/shadcn/ui/label';
import { Switch } from 'ui/components/shadcn/ui/switch';
import TestCard from 'ui/components/shared/Card/TestCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui/components/shadcn/ui/accordion';

export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="bg-red-400">Hello from test-pages</h2>
          <TestCard />
        </div>
        <div className="w28 h-60 bg-lime-500">
          <h6>self components</h6>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
          <div>
            <Accordion className="w-full" collapsible type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
