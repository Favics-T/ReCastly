import React, { use, useCallback, useState } from 'react'
import { FORMATS, TONES } from './data';
import { generateContent } from './service/contentService';

function Home() {
    const[inputText, setInputText] = useState("");
    const[selectedTone,setSelectedTone] = useState('viral');
    const [selectedFormats, setSelectedFormats] = useState(["youtube","twitter,"])
     const[outputs, setOutputs] = useState({});
    const[loading,setLoading] = useState({});
    const[copied, setCopied] = useState(null);
    const[activeTab, setActiveTab] = useState(null)

  const toggleFormat = (id)=>{
    setSelectedFormats((prev)=>
    prev.includes(id)? // checking if formats exist
    prev.filter(f=> f !== id) // delete if it exists
    : [...prev, id] // add it, if it does not exist
) }

const generate = useCallback( async ()=>{
    if(!inputText.trim() || selectedFormats.length === 0) return;

    const tone = 
    TONES.find((t)=> t.id === selectedTone)?.label ?? "viral"

    const newLoading = {};
    selectedFormats.forEach((f)=>(newLoading[f]= true))

    setLoading(newLoading);
    setOutputs({});
    setActiveTabs(selectedFormats[0]);

    await Promise.all(
        selectedFormats.map(async(fid)=>{
            const format = FORMATS.find((f)=> f.id === fid)

            const system = `You are an expert content creator and copywriter. ${format.prompt(
                tone
            )}Be creative, engaging and platform-native. Output only the content itself with no preamble.`
       
                try{
                    const result = await generateContent(system, inputText);

                    setOutputs((prev)=>({
                        ...prev,
                        [fid]: result
                    }));
                } 
                catch{
                    setOutputs((prev)=>({
                        ...prev,
                        [fid]:"Error generating content. Please try again",
                    }));

                }
                    finally{
                        setLoading((prev)=>({
                            ...prev,
                            [fid]:false,
                        }))
                    }
               })
    );
},[inputText, selectedFormats, selectedTone])

 const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadText = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const hasOutputs =
    Object.keys(outputs).length > 0 ||
    Object.values(loading).some(Boolean);

  const activeFormat = FORMATS.find((f) => f.id === activeTab);
  const activeOutput = activeTab ? outputs[activeTab] : null;
  const isActiveLoading = activeTab ? loading[activeTab] : false;



  return (
    <div className='min-h-[100vh]  bg-[#0a0a0f]'>
      
    </div>
  )
}

export default Home
