import { motion } from 'framer-motion'

export function Loader() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <motion.div
                className="w-32 h-32 border-4 border-t-4 border-t-primary border-secondary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
}
