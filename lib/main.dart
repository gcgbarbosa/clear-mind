import 'package:flutter/material.dart';
import 'dart:html' as html;
import 'dart:async';

void main() {
  runApp(ClearmindApp());
}

class ClearmindApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Clearmind',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ClearmindHomePage(),
    );
  }
}

class ClearmindHomePage extends StatefulWidget {
  @override
  _ClearmindHomePageState createState() => _ClearmindHomePageState();
}

class _ClearmindHomePageState extends State<ClearmindHomePage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _sizeAnimation;
  late html.AudioElement _increaseAudio;
  late html.AudioElement _decreaseAudio;
  bool _isAnimating = false;
  Timer? _timer;

  final Duration _increaseDuration = Duration(seconds: 3);
  final Duration _decreaseDuration = Duration(seconds: 12);

  @override
  void initState() {
    super.initState();

    _increaseAudio = html.AudioElement('assets/assets/increase.wav');
    _decreaseAudio = html.AudioElement('assets/assets/decrease.wav');

    _controller = AnimationController(
      vsync: this,
      duration: _increaseDuration + _decreaseDuration,
    );

    _sizeAnimation = TweenSequence<double>([
      TweenSequenceItem<double>(
        tween: Tween<double>(begin: 100.0, end: 200.0)
            .chain(CurveTween(curve: Curves.easeInOut)),
        weight: _increaseDuration.inMilliseconds.toDouble(),
      ),
      TweenSequenceItem<double>(
        tween: Tween<double>(begin: 200.0, end: 100.0)
            .chain(CurveTween(curve: Curves.easeInOut)),
        weight: _decreaseDuration.inMilliseconds.toDouble(),
      ),
    ]).animate(_controller);

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed && _isAnimating) {
        _startAnimation();
      }
    });
  }

  void _startAnimation() {
    _controller.reset();
    _playSound(_increaseAudio);
    _controller.forward();

    _timer?.cancel();
    _timer = Timer(_increaseDuration, () {
      if (_isAnimating) {
        _playSound(_decreaseAudio);
      }
    });
  }

  void _playSound(html.AudioElement audio) {
    audio.currentTime = 0;
    audio.play();
  }

  void _toggleAnimation() {
    setState(() {
      _isAnimating = !_isAnimating;
      if (_isAnimating) {
        _startAnimation();
      } else {
        _controller.stop();
        _timer?.cancel();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Clearmind'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: ElevatedButton(
              onPressed: _toggleAnimation,
              child: Text(_isAnimating ? 'Stop' : 'Start'),
              style: ElevatedButton.styleFrom(
                backgroundColor: _isAnimating ? Colors.red : Colors.green,
              ),
            ),
          ),
        ],
      ),
      body: Center(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            final totalDuration = _increaseDuration + _decreaseDuration;
            final increasePortion =
                _increaseDuration.inMilliseconds / totalDuration.inMilliseconds;

            Color heartColor;
            if (_controller.value < increasePortion) {
              // During increase phase
              heartColor = ColorTween(
                begin: Colors.blue,
                end: Colors.red,
              ).transform(_controller.value / increasePortion)!;
            } else {
              // During decrease phase
              heartColor = ColorTween(
                begin: Colors.red,
                end: Colors.blue,
              ).transform((_controller.value - increasePortion) /
                  (1 - increasePortion))!;
            }

            return CustomPaint(
              size: Size(_sizeAnimation.value, _sizeAnimation.value),
              painter: HeartPainter(color: heartColor),
            );
          },
        ),
      ),
    );
  }
}

class HeartPainter extends CustomPainter {
  final Color color;

  HeartPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path()
      ..moveTo(size.width / 2, size.height / 3)
      ..addPath(
        Path()
          ..moveTo(size.width / 2, size.height / 3)
          ..cubicTo(size.width * 0.1, size.height * 0.1, size.width * 0.1,
              size.height * 0.6, size.width / 2, size.height)
          ..moveTo(size.width / 2, size.height / 3)
          ..cubicTo(size.width * 0.9, size.height * 0.1, size.width * 0.9,
              size.height * 0.6, size.width / 2, size.height)
          ..close(),
        Offset.zero,
      );

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant HeartPainter oldDelegate) {
    return color != oldDelegate.color;
  }
}
