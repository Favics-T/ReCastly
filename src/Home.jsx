import React, { use, useCallback, useState } from 'react'
import { FORMATS, TONES } from './data';
import { generateContent } from './service/contentService';
// import { FaRegStarHalf } from "react-icons/fa";
// import { FaRegStarHalf } from "react-icons/fa";


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
    <div className='min-h-screen  bg-[#0a0a0f]'>
        <div className='repurposer-root'>
            <div className='header-bar'>
                <div className='logo-mark'>RC</div>
                    <div>
                        <div className='logo-text'>ReCastly</div>
                        <div className='logo-sub'>AI Content Engine</div>
                    </div>
            </div>

            <div className="main-layout">
                {/* Left panel */}
                <div className="left-panel">
                    {/* input */}
                    <div>
                        <div className="section-label">Your Content</div>
                        <div className="textarea-wrapper">
                            <textarea className="content-textarea" 
                            value={inputText}
                            onChange={(e)=> setInputText(e.target.value)}
                            placeholder="Paste your content here - blog post, a video transcript, an idea a thread, a speech.. anything" 
                            />
                        </div>
                        <div className="char-count">{inputText.length} chars .~{Math.ceil(inputText.split(/\s+/).filter(Boolean).length)} words</div>
                    </div>

                    {/* Tone */}
                    <div>
                        <div className="section-label">Tone</div>
                        <div className="tone-grid">
                            {TONES.map((t)=>(
                                <button
                                key={t.id}
                                className={`tone-btn ${selectedTone === t.id? 'active':""}`}
                                onClick={()=> setSelectedTone(t.id)}
                                >
                                    <span className='tone-label'>{t.label}</span>
                                    <span className='tone-desc'>{t.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Formats */}
                    <div>
                    <div className='section-label'>OutPut Formats</div>
                    <div className="format-list">
                        {
                            FORMATS.map((f)=>(
                                <button key={f.id} className={`format-btn ${selectedFormats.includes(f.id)? "selected":""}`}
                                onClick={()=> toggleFormat(f.id)}>
                                    <div className='format-icon'
                                    style={{
                                        background: selectedFormats.includes(f.id)
                                        ? `${f.color}22`
                                        :"#1a12e",
                                        color: selectedFormats.includes(f.id)?f.color:'#444'
                                    }}>
                                        {f.icon}
                                    </div>
                                    <span className='format-name'>{f.label}</span>
                                    <div className={`checkmark ${selectedFormats.includes(f.id)? "checked":""}`}>
                                        {selectedFormats.includes(f.id)&& '✓'}
                                    </div>
                                </button>
                            ))}
                    </div>
                    </div>
                    {/* Generate */}
                    <button
                    className='generate-btn'
                    onClick={generate}
                    disabled={!inputText.trim() || selectedFormats.length === 0}
                    >
                        Generate {selectedFormats.length > 0? `${selectedFormats.length} Format${selectedFormats>1 ? "s":""}`: "Content"}
                    </button>
                </div>
                {/* RIGHT PANELA */}
            </div>
            
                    </div>
      
    </div>
  )
}

export default Home
